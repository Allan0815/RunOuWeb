using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RunOuWeb.Areas.Products.Controllers
{
    public class HomeController : Controller
    {
        // GET: Products/Home
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Detail(int id)
        {
            return View();
        }

        [HttpPost]
        public JsonResult Detail()
        {

            return Json("");
        }
    }
}