use cosmwasm_schema::cw_serde;
use cosmwasm_std::{IbcMsg, IbcTimeout, Timestamp};
use ethabi::{ParamType, Token};

use crate::{state::Config, ContractError};

#[cw_serde]
pub struct PacketData {
    pub ping: bool,
    pub counterparty_timeout_timestamp: u64,
}

impl PacketData {
    pub fn decode(bz: impl AsRef<[u8]>) -> Result<Self, ContractError> {
        let values = ethabi::decode(&[ParamType::Bool, ParamType::Int(64)], bz.as_ref())
            .map_err(|_| ContractError::EthAbiDecoding)?;
        match &values[..] {
            &[Token::Bool(ping), Token::Int(counterparty_timeout_timestamp)] => Ok(PacketData {
                ping,
                counterparty_timeout_timestamp: counterparty_timeout_timestamp.as_u64(),
            }),
            _ => Err(ContractError::EthAbiDecoding),
        }
    }

    pub fn encode(&self) -> Vec<u8> {
        ethabi::encode(&[
            Token::Bool(self.ping),
            Token::Int(self.counterparty_timeout_timestamp.into()),
        ])
    }
}

impl PacketData {
    pub fn reverse(
        &self,
        config: &Config,
        current_block_timestamp: u64,
        channel_id: String,
    ) -> IbcMsg {
        let counterparty_packet = PacketData {
            ping: !self.ping,
            counterparty_timeout_timestamp: config.protocol_timeout_seconds
                + current_block_timestamp,
        };
        IbcMsg::SendPacket {
            channel_id,
            data: counterparty_packet.encode().into(),
            timeout: IbcTimeout::with_timestamp(Timestamp::from_seconds(
                self.counterparty_timeout_timestamp,
            )),
        }
    }
}

#[cw_serde]
pub struct InitMsg {
    pub config: Config,
}

#[cw_serde]
pub enum ExecuteMsg {
    Initiate {
        channel_id: String,
        packet: PacketData,
    },
}
