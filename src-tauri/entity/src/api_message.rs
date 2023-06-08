//! `SeaORM` Entity. Generated by sea-orm-codegen 0.11.3

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Deserialize, Serialize)]
#[sea_orm(table_name = "api_message")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub func_name: String,
    pub raw: String,
    pub hdr: Option<String>,
    pub sendto: Option<String>,
    pub send_params: Option<String>,
    pub received: Option<String>,
    pub received_params: Option<String>,
    pub comment: Option<String>,
    pub secenario_id: Option<i32>,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::scenario::Entity",
        from = "Column::SecenarioId",
        to = "super::scenario::Column::Id",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    Scenario,
}

impl Related<super::scenario::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Scenario.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
