include .env
export $(shell sed 's/=.*//' .env)

IBC_HANDLER_CONTRACT_ADDRESS ?= 0x4466196F00F10E633789ac7f054a54a82e4b78C7

REQUIRED_VARIABLES := PRIVATE_KEY SEPOLIA_CONTRACT_ADDRESS COSMWASM_CONTRACT_ADDRESS

$(foreach variable,$(REQUIRED_VARIABLES),$(if $(strip $($(variable))),, $(error $(variable) is not set)))

.PHONY: demo-initiate check-node-modules


demo-initiate:
	@echo "Running ping pong initiate demo…"

	bun ./scripts/demo-initiate.ts


check-node-modules:
	@if [ ! -d "node_modules" ]; then \
		echo "node_modules not found, running npm install..."; \
		npm install; \
	fi
