rpc_url := https://sepolia.drpc.org
# Pre-deployed ibc handler from Union, see README.md for the contract addresses
ibc_handler := 0xa390514f803a3b318b93bf6cd4beeb9f8299a0eb

# Application specific, used when creating the contract (threaded to the
# constructor). The version is provided when opening the channel.
application_default_pingpong_timeout := "36000000000000"
application_protocol_version = ucs00-pingpong-1

channel_state_init := 1
channel_order_unordered := 1
# Pre-created by Union
channel_connection := connection-5

.PHONY: deploy

deploy:
	forge create src/PingPong.sol:PingPong \
    --json \
		--rpc-url ${rpc_url} \
		--private-key ${PRIVATE_KEY} \
		--constructor-args "${ibc_handler}" "${application_default_pingpong_timeout}" | jq -r .deployedTo | tr A-Z a-z | tee /dev/tty | \
		xargs -I{} cast send --async \
			--rpc-url ${rpc_url} \
			--private-key ${PRIVATE_KEY} \
			${ibc_handler} \
			"channelOpenInit((string, (uint8, uint8, (string, string), string[], string), address))" '("{}", (${channel_state_init}, ${channel_order_unordered}, ("wasm.${COSMWASM_CONTRACT_ADDRESS}", ""), ["${channel_connection}"], "${application_protocol_version}"), {})'

initiate:
	cast send \
		--rpc-url ${rpc_url} \
		--private-key ${PRIVATE_KEY} \
		${CONTRACT_ADDRESS} \
		"initiate((bool, uint64), uint64)" "(false, 18446744073709551615)" 18446744073709551615

