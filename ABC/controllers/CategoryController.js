const CategoryModel = require("../models/Category");

//get root category
exports.getCategory = (req, res, next) => {
  console.log("session----", req.session);
  CategoryModel.find({ isRoot: true }).exec((err, data) => {
    res.render("category/index", {
      data: data,
      parentId: null
    });
  });
};

//get sub category
exports.getSubCategory = (req, res, next) => {
  try {
    const categoryId = req.params.parentId;
    console.log("categoryId", categoryId);

    CategoryModel.find({ parent: categoryId }).exec((err, data) => {
      res.render("category/index", {
        data: data,
        parentId: categoryId
      });
    });
  } catch (e) {
    console.log("exception", e);
  }
};

//
exports.getNewCategory = (req, res, next) => {
  const parentId = req.params.parentId;
  const condition = parentId ? { parent: parentId } : { isRoot: true };
  CategoryModel.find(condition).exec((err, data) => {
    let arrCategory = parentId
      ? data
      : [
          {
            categoryName: "---None---",
            _id: 0
          }
        ].concat(data);
    console.log("ccccc", arrCategory);
    res.render("category/create", {
      data: { parentCategory: arrCategory }
    });
  });
};

//create a new category
exports.postNewCategory = (req, res, next) => {
  console.log("req body", req.body);
  req.checkBody("categoryName", "Tên danh mục không được để trống").notEmpty();
  req.getValidationResult().then(function(errors) {
    if (!errors.isEmpty()) {
      var errors = errors.mapped();

      res.render("category/create", {
        title: "Thêm danh mục bài viết",
        errors: errors,
        data: {
          ...req.body,
          parentCategory: JSON.parse(req.body.parentCategory)
        }
      });
    } else {
      try {
        const parentId = req.body.parentId;
        const isRoot = parentId === "0";

        let postData = {
          categoryName: req.body.categoryName || null,
          slug: req.body.slug || null,
          parent: isRoot ? null : parentId,
          isRoot: isRoot,
          subCategory: null,
          posts: null,
          description: req.body.description || null,
          status: req.body.status || 0,
          createdBy: req.session.account._id
        };
        let newRecord = new CategoryModel(postData);
        newRecord.save((err, result) => {
          if (err) {
            console.log("err", err);
            req.flash(
              "errors",
              "Có lỗi xảy ra. Vui lòng thử lại" + JSON.stringify(err)
            );
            return res.redirect("/admin/category");
          }
          if (!isRoot) {
            // if is subcategory, add to sub in parent by update parent
            console.log("result", result);
            CategoryModel.findOne({ _id: parentId }).exec((err, parentCate) => {
              console.log("eer---", err);
              console.log("parentCate---", parentCate);
              if (parentCate) {
                parentCate.subCategory = !parentCate.subCategory
                  ? [result._id]
                  : [...parentCate.subCategory, result._id];
                parentCate.updatedBy = req.session.account._id;

                parentCate.save((err, updated) => {
                  if (err) {
                    console.log("err", err);
                    req.flash(
                      "errors",
                      "Có lỗi xảy ra. Vui lòng thử lại" + JSON.stringify(err)
                    );
                    return res.redirect("/admin/category");
                  }
                  req.flash(
                    "success",
                    "Danh mục " + result.categoryName + " đã được tạo"
                  );
                  return res.redirect("/admin/category");
                });
              }
            });
          } else {
            console.log("111111");
            req.flash(
              "success",
              "Danh mục " + result.categoryName + " đã được tạo"
            );
            return res.redirect("/admin/category");
          }
        });
      } catch (e) {
        console.log("exception", e);
      }
    }
  });
};
