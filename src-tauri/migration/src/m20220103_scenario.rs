use super::m20220102_functions::Functions;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Scenario::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Scenario::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Scenario::Name).string_len(10).not_null())
                    .col(ColumnDef::new(Scenario::FuncName).string_len(10).not_null())
                    .col(ColumnDef::new(Scenario::OldRawMsg).string())
                    .col(ColumnDef::new(Scenario::NewRawMsg).string())
                    .col(ColumnDef::new(Scenario::Comment).string())
                    .col(ColumnDef::new(Scenario::FuncId).integer())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-func_sec-id")
                            .from(Scenario::Table, Scenario::FuncId)
                            .to(Functions::Table, Functions::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Scenario::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum Scenario {
    Table,
    Id,
    Name,
    FuncName,
    OldRawMsg,
    NewRawMsg,
    Comment,
    FuncId,
}
