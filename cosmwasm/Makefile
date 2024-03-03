union_version := v0.20.0-rc1
union_cmd := docker run --rm -v /tmp:/tmp -v $(PWD)/cosmwasm/build:/build -v $(PWD)/cosmwasm/.keyring:/keyring ghcr.io/unionlabs/uniond-release:${union_version}

rpc_url := https://rpc.testnet.bonlulu.uno:443
chain_id := union-testnet-6
account_name := $(shell xxd -l16 -ps /dev/urandom)
contract_label := $(shell xxd -l16 -ps /dev/urandom)
contract_salt := $(shell xxd -l16 -ps /dev/urandom)

.PHONY: build deploy

build:
	mkdir -p build && RUSTFLAGS='-C target-cpu=mvp -C opt-level=z' cargo build --target wasm32-unknown-unknown --no-default-features --lib --release -Z build-std=std,panic_abort -Z build-std-features=panic_immediate_abort && wasm-opt target/wasm32-unknown-unknown/release/ibc_protocol.wasm -o build/contract.wasm -O3 --converge

deploy: build
	${union_cmd} keys import-hex ${account_name} ${PRIVATE_KEY} --keyring-backend test --keyring-dir /keyring && \
		${union_cmd} tx wasm store /build/contract.wasm --gas auto --gas-adjustment 1.5 --output json -y --keyring-backend test --keyring-dir /keyring --node ${rpc_url} --chain-id ${chain_id} --from ${account_name} | \
		jq .txhash | \
		xargs -I{} sh -c "${union_cmd} query event-query-tx-for {} --output json --node ${rpc_url} || ${union_cmd} query tx {} --output json --node ${rpc_url}" | \
		jq -r '.events[] | select(.type == "store_code") | .attributes[] | select(.key == "code_id") | .value' | \
		xargs -I{} ${union_cmd} tx wasm instantiate2 {} '{ "config": { "protocol_timeout_seconds": 3600 }}' ${contract_salt} --label ${contract_label} --no-admin --gas auto --gas-adjustment 1.5 --output json -y --keyring-backend test --keyring-dir /keyring --node ${rpc_url} --chain-id ${chain_id} --from ${account_name} | \
		jq .txhash | \
		xargs -I{} sh -c "${union_cmd} query event-query-tx-for {} --output json --node ${rpc_url} || ${union_cmd} query tx {} --output json --node ${rpc_url}" | \
		jq -r '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value' | \
		xargs -I{} echo "Contract address {}" && \
		rm -rf /keyring/*
