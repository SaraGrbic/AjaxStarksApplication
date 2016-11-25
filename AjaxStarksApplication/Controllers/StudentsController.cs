using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using AjaxStarksApplication;

namespace AjaxStarksApplication.Controllers
{
    public class StudentsController : Controller
    {
        private StarksBase db = new StarksBase();

        // GET: Students
        public ActionResult Index()
        {
            return View();
        }
        //GET: Students list
       public ActionResult GetStudents()
        {
            var students = db.Students.ToList();
            return Json(students, JsonRequestBehavior.AllowGet);
        } 
        //GET: student by id
        public ActionResult Get(int id)
        {
            var student = db.Students.ToList().Find(x => x.Id == id);
            return Json(student, JsonRequestBehavior.AllowGet);
        }
      

        // POST: Students/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create([Bind(Exclude = "Id")] Student student)
        {
            if (ModelState.IsValid)
            {
                db.Students.Add(student);
                db.SaveChanges();
             
            }

            return Json(student, JsonRequestBehavior.AllowGet);
        }
        //Update student
        [HttpPost]
        public ActionResult Update(Student student)
        {
            if (ModelState.IsValid)
            {
                db.Entry(student).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(student, JsonRequestBehavior.AllowGet);
        }

 
        // Delete student by id
        [HttpPost]
        public ActionResult Delete(int? id)
        {
            var student = db.Students.ToList().Find(x => x.Id == id);
           
            if (student != null)
            {
                db.Students.Remove(student);
                db.SaveChanges();
            }
            return Json(student, JsonRequestBehavior.AllowGet);
        }

     

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}
    }
}
