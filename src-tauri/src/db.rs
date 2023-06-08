use sea_orm::{Database, DatabaseConnection};
use std::env;

pub struct DB {
    pub connection: DatabaseConnection,
}

impl DB {
    pub async fn new() -> Self {
        let connection =
            Database::connect(env::var("DATABASE_URL").expect("can not find env config file"))
                .await
                .expect("Could not connect to database");

        DB { connection }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use dotenvy::dotenv;

    // 使用宏来调用async函数
    macro_rules! run_test {
        ($e:expr) => {
            tokio_test::block_on($e)
        };
    }

    async fn init_db() {
        dotenv().ok();

        let db = DB::new().await;
        let conn = db.connection;

        println!("connection of db is {:?}", conn)
    }

    /// exec this function in Debug mode
    #[test]
    fn initialize_database() {
        run_test!(init_db())
    }
}
