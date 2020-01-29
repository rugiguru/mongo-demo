const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true,useUnifiedTopology: true })
.then(res => console.log('Connected to db'));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[ String ],
    date: {type : Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name:'React js course',
        author: 'Guru Prasad',
        tags:['React', 'frontend'],
        isPublished: true
    })
    const result = await course.save();
    console.log(result)
}

async function getCourses () {
    const courses = await Course
        .find({ author:'Guru Prasad', isPublished:true})
        .limit(10)
        .sort({name:1})
        .select({name:1, tags:1})

    console.log(courses)
}

const updateCourse = async (id) =>{
    const course = await Course.findById(id)

    if(!course) return;

    course.isPublished= true;
    course.author= 'Another guy'

    const result = await course.save()

    console.log(result)
}

updateCourse('5e300c249dbf5f3aa49130d5');


