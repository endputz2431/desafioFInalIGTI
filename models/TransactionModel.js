export default (mongoose) => {
  const schema = mongoose.Schema({
    description: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    yearMonth: { type: String, required: true },
    yearMonthDay: { type: String, required: true },
    type: { type: String, required: true },
  });

  /*
  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });
  */

  const transaction = mongoose.model('transaction', schema);

  return transaction;
};
