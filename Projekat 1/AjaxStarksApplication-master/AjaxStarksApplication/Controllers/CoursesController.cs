
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;

namespace AjaxStarksApplication.Controllers
{
    public class CoursesController : Controller
    {
        private StarksBase db = new StarksBase();
        // GET: Courses
        public ActionResult Index()
        {
            return View();
        }
        //GET: Courses List
        public ActionResult GetCourses()
        {
            var courses = db.Courses.ToList();
            return Json(courses, JsonRequestBehavior.AllowGet);
        }
        //GET: Course by Id
        public ActionResult Get(int courseId)
        {
            var course = db.Courses.ToList().Find(x => x.CourseId == courseId);
            return Json(course, JsonRequestBehavior.AllowGet);
        }
        //POST: Create course
        [HttpPost]
        public ActionResult Create([Bind(Exclude = "CourseId")] Course course)
        {
            if(ModelState.IsValid)
            {
                 db.Courses.Add(course);
                db.SaveChanges();
            }
            return Json(course, JsonRequestBehavior.AllowGet);
        }
        //POST: Update course
        [HttpPost]
        public ActionResult Update(Course course)
        {
            if(ModelState.IsValid)
            {
                db.Entry(course).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(course, JsonRequestBehavior.AllowGet);
        }
        //Delete course by Id
        [HttpPost]
        public ActionResult Delete(int? courseId)
        {
            var course = db.Courses.ToList().Find(x => x.CourseId == courseId);

            if (course !=null)
            {
                db.Courses.Remove(course);
                db.SaveChanges();

            }
            return Json(course, JsonRequestBehavior.AllowGet);

        }
    }
}