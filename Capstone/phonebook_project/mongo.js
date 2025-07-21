const mongoose = require('mongoose')

async function main() {
  if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
  }

  const password = process.argv[2];
  const url = `mongodb+srv://benjaminqwalker:${password}@cluster0.dfi3fzy.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(url);

    const schema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Person = mongoose.model('Person', schema);

    if (process.argv.length === 5) {
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({name, number});
      const result = await person.save();
      console.log(`Added ${result.name} number ${result.number} to the phonebook`);
    } else {
      const people = await Person.find({});
      console.log('Phonebook:');
      people.forEach(person => {
        console.log(`${person.name}, ${person.number}`);
      });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    mongoose.connection.close();
  }
}

main();
