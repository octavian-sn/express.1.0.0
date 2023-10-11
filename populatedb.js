
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Tea = require("./models/tea");
const Category = require("./models/category");

const allTea = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createTea();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
    const category = new Category({ name, description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function teaCreate(index, name, description, price, stock, category){
    const tea = new Tea({
        name, 
        description,
        price,
        stock,
        category,
    })
    await tea.save();
    allTea[index] = tea;
    console.log(`Added tea: ${name}`);
}


async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate(0, "Black", "Bold and robust, black tea boasts a deep amber hue and a full-bodied flavor. It's the ideal choice for those seeking an energizing cup of tea to kickstart their day. Enjoy the invigorating aroma and dark, malty notes."),
        categoryCreate(1, "Yellow", "Yellow tea is a hidden gem among tea varieties, with a mellow and delicate character. With subtle floral notes and a pale golden color, it's the epitome of elegance in a cup. Perfect for moments of serenity and sophistication."),
        categoryCreate(2, "Green", "Green tea, a classic choice for tea enthusiasts, offers a delightful balance of vegetal notes and a soothing aroma. Known for its rich history and antioxidant properties, green tea is the perfect companion for a moment of calm reflection."),
        categoryCreate(3, "Oolong", "Oolong tea is the embodiment of balance, harmonizing the flavors of green and black teas. Its semi-oxidized leaves offer a nuanced taste, ranging from fruity to floral. Oolong tea is a journey of taste exploration."),
        categoryCreate(4, "Dark", "Aged to perfection, dark tea carries the essence of time in every sip. This tea variety offers a unique earthy taste and an enticing aroma. It's perfect for those who appreciate the complexity and depth that only time can impart."),
        categoryCreate(5, "White", "White tea is the epitome of simplicity and purity. With its pale color and a subtle, slightly sweet flavor, it's the tea of choice for those who seek serenity and purity in each sip. Allow the gentle taste to soothe your senses."),
    ]);
}



async function createTea() {
    console.log("Adding tea");
    await Promise.all([
        teaCreate(0, 
            "Fire Blood", 
            "Start your day off right with this invigorating black tea blend, infused with hints of citrus and ginger.", 
            104.99,
            111, 
            categories[0]
        ),
        teaCreate(1, 
            "Citrus Burst", 
            "A zingy yellow tea infused with the bright, refreshing flavors of lemon and lime.", 
            29.1,
            87, 
            categories[1]
        ),
        teaCreate(2, 
            "Nature's Absinth", 
            "This blend of green tea and elderberries will transport you to a magical forest filled with fairies and unicorns.", 
            110.5,
            215, 
            categories[2]
        ),
        teaCreate(3, 
            "Masala Chai", 
            "A spicy oolong tea blend with aromatic spices like cinnamon, cardamom, and cloves, inspired by traditional Indian chai.", 
            29.9,
            54, 
            categories[3]
        ),
        teaCreate(4, 
            "Blueberry Bliss", 
            "A fruity dark tea infused with the sweet, juicy flavor of fresh blueberries.", 
            54.9,
            37, 
            categories[4]
        ),
        teaCreate(5, 
            "Fairy Made", 
            "This spicy white tea is infused with the warming flavors of ginger and cinnamon.", 
            100,
            93, 
            categories[5]
        ),
    ]);
}
