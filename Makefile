deploy-evm:
	make -C solidity deploy

deploy-union:
	make -C cosmwasm deploy

check-channel:
	make -C cosmwasm check-channel

initiate-evm:
	make -C solidity initiate
