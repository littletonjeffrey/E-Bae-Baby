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

// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    // be sure to include its associated Products
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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    //fixed syntax on this call by referencing Kurt Bixby's challenge
    // =============================
    res.status(200).json(await Category.update(req.body,{
      where: {id: req.params.id}
      }));
  //  ================================
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
