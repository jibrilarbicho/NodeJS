const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/ApiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No Document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: {
        doc,
      },
    });
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // const doc = await Model.findById(req.params.id).populate('reviews');
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    const id = req.params.id * 1; //times is uesd to convert id to number
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'no Document found with this ID',
      });
      return;
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //To allow for nested GET reviews on Tour
    let filter = {};
    if (req.params.tourID) filter = { tour: req.params.tourID };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limiting()
      .pagination();
    // const doc = await features.query.explain();
    const doc = await features.query;
    // console.log(req.params);
    const id = req.params.id * 1; //times is uesd to convert id to number
    res.status(200).json({
      status: 'sucess',
      resluts: doc.length,
      data: {
        doc,
      },
    });
  });
