// Test Code
// -> https://jp.vuejs.org/v2/cookbook/client-side-storage.html


// --- Generate UUID --- //
const uid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
    .replace(/y/g, () => (Math.floor(Math.random() * 4) + 8).toString(16))
  ;
};


// --- Vue App --- //
var app = new Vue({
  // Element
  el: '#app',
  
  // Data
  data: {
    // Product
    product: "製品名",
    
    // Objects
    objects: [],
    
    // Display
    activeObjectIndex: 0,
    activeAction: {},
  },

  created() {
    // Objects
    if (localStorage.getItem('objects')) {
      try {
        this.objects = JSON.parse(localStorage.getItem('objects'));
      } catch(e) {
        localStorage.removeItem('objects');
      }
    }
    console.log("Objects:", this.objects);
  },
  
  // Mounted
  mounted() {
    // Object Default Active
    if (this.objects.length > 0) {
      this.objects.forEach((object, index) => {
        if (index == 0) {
          object.isActive = true;
        } else {
          object.isActive = false;
        }
      })
    }
  },
  
  // Methods
  methods: {
    // isActive
    isActive: function(event) {
      // すべてのObjectのisActiveをfalseにする
      this.objects.forEach(function(object) {
        object.isActive = false;
      });
      
      // すべてのliからactiveクラスを取り除く
      var list = document.getElementById("graph-oo-object-list").children;
      for (var i = 0; i < list.length; i++) {
        list[i].className = "";
      }

      // // クリックしたObjectのisActiveだけtrueにする
      list = [].slice.call(list);
      let index = list.indexOf(event.currentTarget);
      this.objects[index].isActive = true;

      // クリックしたliだけactiveクラスを与える
      event.currentTarget.className = "active";

      // activeObjectIndexにクリックしたDOMのindexを入れる
      this.activeObjectIndex = index;
    },

    // Object
    addObject() {
      // if (!this.newObject.name) {
      //   return;
      // };

      // すべてobjectのisActiveをfalseにする
      this.objects.forEach(function(object) {
        object.isActive = false;
      });
      
      // New Object
      let index = Object.keys(this.objects).length;
      let id = uid();
      let name = "オブジェクト";
      let properties = ['名前', 'ID', '作成日'];
      let actions = ['削除', '編集'];
      let isActive = true;
      
      console.log("New Object:", index, id, name, properties, actions, isActive)

      this.objects.push({
        index,
        id,
        name,
        properties,
        actions,
        isActive
      });
      
      // inputを空にする
      // this.newObject.name = '';

       // activeObjectに新しいobjectを入れる
      this.activeObject = this.objects[index];
      this.activeObjectIndex = index;

      // Save
      this.saveObjects();
    },
    removeObject(index, object) {
      this.$delete(this.objects, index)
      this.saveObjects();
    },
    saveObjects() {
      let parsed = JSON.stringify(this.objects);
      localStorage.setItem('objects', parsed);
    },
    clearObjects() {
      this.objects = [];
      this.saveObjects();
    },
  
    // Action
    addAction(object) {
      // this.objects[this.activeObjectIndex].actions.push("")
      object.actions.push("")

      // Save
      this.saveObjects();
    },
    removeAction(index, object) {
      object.actions.splice(index, 1);
      
      // Save
      this.saveObjects();
    },

    // Property
    addProperty(object) {
      // this.objects[this.activeObjectIndex].properties.push("")
      object.properties.push("")

      // Save
      this.saveObjects();
    },
    removeProperty(index, object) {
      // this.objects[this.activeObjectIndex].properties.splice(e, 1);
      // this.objects[index].properties.splice(e, 1);
      object.properties.splice(index, 1);
      
      // Save
      this.saveObjects();
    }
  }
})
