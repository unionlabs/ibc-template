build:
	RUSTFLAGS='-C target-cpu=mvp -C opt-level=z' cargo build --target wasm32-unknown-unknown --no-default-features --lib --release -Z build-std=std,panic_abort -Z build-std-features=panic_immediate_abort
