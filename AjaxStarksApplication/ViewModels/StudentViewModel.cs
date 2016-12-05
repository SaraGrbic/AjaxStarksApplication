﻿using System;
using System.Collections.Generic;

namespace AjaxStarksApplication.ViewModels
{
    public class StudentViewModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string DateOfBirth { get; set; }

        public string Gender { get; set; }

        //ne treba nam sad
        //public IEnumerable<EnrollmentViewModel> Enrollments { get; set; }
    }
}