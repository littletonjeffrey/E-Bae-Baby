const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
   // find all categories
  // be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
 })
.then (data => {
  res.json(data)
})  .catch (err => {
  res.status(500).json(err);
})
});
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [Product]
    })
  .then (data => {
    res.json(data)
  })  .catch (err => {
    res.status(500).json(err);
  })
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
     res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    res.status(200).json(await Category.update(req.body,{
      where: {
        id: req.params.id}
      }));
   
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
