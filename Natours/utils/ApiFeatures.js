class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    const queryObject = { ...this.queryStr };
    const excludedFields = ['sort', 'limit', 'fields', 'page'];
    excludedFields.forEach((el) => delete queryObject[el]); //to delete from
    let queryStr = JSON.stringify(queryObject);
    console.log('Original:', queryStr);
    queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    this.query.find(JSON.parse(queryStr)); //the same as the bellow
    // this.query = this.query.find(JSON.parse(queryStr));
    // console.log(this);
    return this;
  }
  // sort() {
  //   if (this.queryStr.sort) {
  //     const sortBy = this.queryStr.sort.split(',').join('');
  //     this.query = this.query.sort(sortBy);

  //     // query = query.sort(req.query.sort);
  //   } else {
  //     this.query = this.query.sort(-'createdAt');
  //   }
  //   return this;
  // }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' '); // Corrected construction
      this.query = this.query.sort(sortBy); // Applying corrected sorting
    } else {
      this.query = this.query.sort({ createdAt: -1 }); // Corrected usage of sort
    }
    return this;
  }

  limiting() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join('');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  pagination() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.page * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
