use super::m20220103_scenario::Scenario;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(ApiMessage::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(ApiMessage::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(ApiMessage::FuncName)
                            .string_len(10)
                            .not_null(),
                    )
                    .col(ColumnDef::new(ApiMessage::Raw).string_len(10).not_null())
                    .col(ColumnDef::new(ApiMessage::Hdr).string())
                    .col(ColumnDef::new(ApiMessage::Sendto).string())
                    .col(ColumnDef::new(ApiMessage::SendParams).json())
                    .col(ColumnDef::new(ApiMessage::Received).string())
                    .col(ColumnDef::new(ApiMessage::ReceivedParams).json())
                    .col(ColumnDef::new(ApiMessage::Comment).string())
                    .col(ColumnDef::new(ApiMessage::SecenarioId).integer())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-sec_msg-id")
                            .from(ApiMessage::Table, ApiMessage::SecenarioId)
                            .to(Scenario::Table, Scenario::Id),
                    )
                    .col(ColumnDef::new(ApiMessage::CreatedAt).timestamp())
                    .col(ColumnDef::new(ApiMessage::UpdatedAt).timestamp())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(ApiMessage::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum ApiMessage {
    Table,
    Id,
    FuncName,
    Raw,
    Hdr,
    Sendto,
    SendParams,
    Received,
    ReceivedParams,
    Comment,
    SecenarioId,
    CreatedAt,
    UpdatedAt,
}
