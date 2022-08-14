const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
  // be sure to include its associated Product data
  include: [Product],
  })
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data
    include: [Product]
    })
  .then (data => {
    res.json(data)
  })  .catch (err => {
    res.status(500).json(err);
  })
  
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
     res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
