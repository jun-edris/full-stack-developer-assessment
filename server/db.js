const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`DB connected`);
	} catch (error) {
		console.log('Connection to link DB failed');
	}
};

module.exports = dbConnect;
