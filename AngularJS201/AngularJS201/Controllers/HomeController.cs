using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace AngularJS201.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        [HttpPost]
        public void WriteDataTest(string input)
        {

        }

        [HttpGet]
        public string ReadDataTest()
        {
            return ReadData();
        }


        public void WriteData(string input)
        {
            var txtWriter = new StreamWriter(Server.MapPath("~/App_Data/Main.txt"));
            txtWriter.WriteLine(input);
            txtWriter.Close();
        }

        public string ReadData()
        {
            var txtReader = new StreamReader(Server.MapPath("~/App_Data/Main.txt"));
            string txt = txtReader.ReadLine();
            txtReader.Close();
            return txt;
        }
    }
}
