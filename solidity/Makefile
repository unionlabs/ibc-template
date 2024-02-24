deploy:
	forge create src/PingPong.sol:PingPong \
		--rpc-url "https://ethereum-sepolia-rpc.publicnode.com" \
		--private-key ${PRIVATE_KEY} \
		--constructor-args "0x80Ae19d672F3Bf5c733E11B7D1a2B880E338165f" "3600"

bind-port:
	cast send \
		--private-key ${PRIVATE_KEY} \
		--rpc-url "https://ethereum-sepolia-rpc.publicnode.com" \
		0x80Ae19d672F3Bf5c733E11B7D1a2B880E338165f \
		"bindPort(string, address)" "pingpong-1" "0xB1244a01b031F68368430891b2D074F00664075d"

open-channel:
	cast send \
		--private-key ${PRIVATE_KEY} \
		--rpc-url "https://ethereum-sepolia-rpc.publicnode.com" \
		0x80Ae19d672F3Bf5c733E11B7D1a2B880E338165f \
		"channelOpenInit((string, (uint8, uint8, (string, string), string[], string)))" '("pingpong-1", (1, 1, ("wasm.blabla", ""), ["connection-0"], "ucs00-pingpong-1"))'
