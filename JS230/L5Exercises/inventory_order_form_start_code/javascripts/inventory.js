let inventory;

(function() {
  let itemTemplate;

  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      let date = new Date();
      // $("#order_date").text(date.toUTCString());
      // jquery grabbing an element and setting its text. instead use querySelector and `textContent =`
      document.querySelector("#order_date").textContent = (date.toUTCString());
    },
    cacheTemplate: function() {
      itemTemplate = Handlebars.compile(document.querySelector('#inventory_item').innerHTML);
      /* I didn't save the previous code, but this stores the HB template in the
      * itemTemplate variable so that object may be passed to it.*/
    },

    add: function() {
      this.lastId++;
      let item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      let found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(previousItem) {
      let id = this.findID(previousItem),
          item = this.get(id);

      item.name = previousItem.find("[name^=item_name]").val();
      item.stock_number = previousItem.find("[name^=item_stock_number]").val();
      item.quantity = previousItem.find("[name^=item_quantity]").val();
    },
    newItem: function(e) {
      e.preventDefault();
      let item = itemTemplate(this.add());
          // $item = $(this.template.replace(/ID/g, item.id));
      // $("#inventory").append($item);
      document.querySelector('#inventory').insertAdjacentHTML("beforeend", item);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(item) {
      return +item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();
      if (e.target.classList.contains('delete')) {
      let item = this.findParent(e);
      this.remove(this.findID(item));
      item.remove();
      }
    },
    updateItem: function(e) {
      let item = this.findParent(e);

      this.update(item);
    },
    bindEvents: function() {
      // $("#add_item").on("click", $.proxy(this.newItem, this));
      document.querySelector("#add_item").addEventListener("click", this.newItem.bind(this));
      document.querySelector("#inventory")
        .addEventListener('click', this.deleteItem.bind(this));
      document.querySelector("#inventory")
        .addEventListener('focusout', this.updateItem.bind(this));
    },
    /**/
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

// $($.proxy(inventory.init, inventory));
document.addEventListener('DOMContentLoaded', e => inventory.init.bind(inventory)());
