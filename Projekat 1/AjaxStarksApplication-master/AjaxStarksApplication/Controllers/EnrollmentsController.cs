
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;

namespace AjaxStarksApplication.Controllers
{
    public class EnrollmentsController : Controller
    {
        private StarksBase db = new StarksBase();
        // GET: Enrollments
        public ActionResult Index()
        {
            return View();
        }
        //Get:  Enrollments list
        public ActionResult GetEnrollments()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var enrollment = db.Enrollments.ToList();
            return Json(enrollment, JsonRequestBehavior.AllowGet);
        }
        //Get: Enrollment by Id
        public ActionResult Get(int id)
        {
           
            var enrollment = db.Enrollments.ToList().Find(x => x.EnrollmentId == id);
            return Json(enrollment, JsonRequestBehavior.AllowGet);
        }
        //POST: Create Enrollment
        [HttpPost]
        public ActionResult Create([Bind(Exclude = "EnrollmentId")]Enrollment enrollment)
        {
            if (ModelState.IsValid)
            {
                db.Enrollments.Add(enrollment);
                db.SaveChanges();
            }
            return Json(enrollment, JsonRequestBehavior.AllowGet);
        }
        //POST: Update Enrollment
        [HttpPost]
        public ActionResult Update(Enrollment enrollment)
        {
            if (ModelState.IsValid)
            {
                db.Entry(enrollment).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(enrollment, JsonRequestBehavior.AllowGet);
        }
        //POST: Delete Enrollment
        [HttpPost]
        public ActionResult Delete(int? id)
        {
            var enrollment = db.Enrollments.ToList().Find(x => x.EnrollmentId == id);
            if (ModelState.IsValid)
            {
                db.Enrollments.Remove(enrollment);
                db.SaveChanges();

            }
            return Json(enrollment, JsonRequestBehavior.AllowGet);
        }
    }
}