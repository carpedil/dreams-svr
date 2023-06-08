use super::m20220101_module::Module;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Functions::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Functions::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Functions::Name).string_len(10).not_null())
                    .col(ColumnDef::new(Functions::Uri).string_len(10).not_null())
                    .col(ColumnDef::new(Functions::ModuleId).integer().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-mod_func-id")
                            .from(Functions::Table, Functions::ModuleId)
                            .to(Module::Table, Module::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Functions::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum Functions {
    Table,
    Id,
    Name,
    Uri,
    ModuleId,
}
