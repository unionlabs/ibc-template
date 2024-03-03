rpc_url := https://ethereum-sepolia-rpc.publicnode.com
# Pre-deployed ibc handler from Union
ibc_handler := 0x4466196F00F10E633789ac7f054a54a82e4b78C7

# Application specific, used when creating the contract (threaded to the
# constructor). The version is provided when opening the channel.
application_default_pingpong_timeout := "3600"

application_protocol_version = ucs00-pingpong-1

channel_state_init := 1
channel_order_unordered := 1
# Pre-created ibc connection from Union
channel_connection := connection-1

.PHONY: deploy bind-port open-channel

deploy:
	forge create src/PingPong.sol:PingPong \
    --json \
		--rpc-url ${rpc_url} \
		--private-key ${PRIVATE_KEY} \
		--constructor-args "${ibc_handler}" "${application_default_pingpong_timeout}" | jq .deployedTo | \
		xargs -I{} cast send \
			--rpc-url ${rpc_url} \
			--private-key ${PRIVATE_KEY} \
			${ibc_handler} \
			"channelOpenInit((string, (uint8, uint8, (string, string), string[], string)))" '("{}", (${channel_state_init}, ${channel_order_unordered}, ("wasm.${COSMWASM_CONTRACT_ADDRESS}", ""), ["${channel_connection}"], "${application_protocol_version}"))'
