use async_graphql::Object;

#[derive(Debug, Copy, Clone)]
pub struct Color(pub i32);

impl From<i32> for Color {
	fn from(value: i32) -> Self {
		Self(value)
	}
}

#[Object]
impl Color {
	pub async fn hex(&self) -> String {
		format!("#{:08X}", self.0)
	}

	pub async fn r(&self) -> u8 {
		((self.0 >> 24) & 0xFF) as u8
	}

	pub async fn g(&self) -> u8 {
		((self.0 >> 16) & 0xFF) as u8
	}

	pub async fn b(&self) -> u8 {
		((self.0 >> 8) & 0xFF) as u8
	}

	pub async fn a(&self) -> u8 {
		(self.0 & 0xFF) as u8
	}
}