namespace AjaxStarksApplication
{

    using System.ComponentModel.DataAnnotations.Schema;
  

    [Table("Enrollment")]
    public partial class Enrollment
    {
       
        public int EnrollmentId { get; set; }

        public int CourseId { get; set; }

        public int StudentId { get; set; }
   
        public int? Mark { get; set; }

       
        public virtual Course Course { get; set; }
        
        public virtual Student Student { get; set; }
    }
}
