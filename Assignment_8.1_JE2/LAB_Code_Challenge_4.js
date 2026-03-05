
let Image = function(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}


Image.prototype.show = function() {
    console.log(`${this.title} (${this.artist}, ${this.date})`);
}


let images = {
    list: [],

    contains: function(title) {
        let retVal = false;
        for (let image of this.list) {
            if (image.title === title) {
                retVal = true;
                break;
            }
        }
        return retVal;
    },

    add: function(title, artist, date) {
        if (!this.contains(title)) {
            this.list.push(new Image(title, artist, date));
        }
    },

    show: function() {
        for (let image of this.list) {
            image.show();
        }
    },

    edit: function(title, artist, date) {
        for (let image of this.list) {
            if (image.title === title) {
                image.artist = artist;
                image.date = date;
                break;
            }
        }
    },

    delete: function(title) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].title === title) {
                this.list.splice(i, 1);
                break;
            }
        }
    },

    clear: function() {
        this.list = [];
    }
};



console.log("After adding");

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.add('Mona Lisa', 'Leonardo da Vinci', 1503); 

images.show();


console.log("\nAfter editing");
images.edit('Mona Lisa', 'Leonardo da Vinci', 1504);
images.show();


console.log("\nAfter deleting");
images.delete('The Last Supper');
images.show();


console.log("\nAfter clearing");
images.clear();
images.show();