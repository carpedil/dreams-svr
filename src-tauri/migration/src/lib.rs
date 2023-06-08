pub use sea_orm_migration::prelude::*;

mod m20220101_module;
mod m20220102_functions;
mod m20220103_scenario;
mod m20220104_apimessage;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_module::Migration),
            Box::new(m20220102_functions::Migration),
            Box::new(m20220103_scenario::Migration),
            Box::new(m20220104_apimessage::Migration),
        ]
    }
}
