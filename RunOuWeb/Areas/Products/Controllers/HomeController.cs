using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RO.Model;

namespace RunOuWeb.Areas.Products.Controllers
{
    public class HomeController : Controller
    {
        RO.Services.ProductService service = new RO.Services.ProductService();

        // GET: Products/Home
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List(BtTableParameter param)
        {
            return Json("");
        }

        
        public ActionResult Detail(int id)
        {
            ViewBag.attrs = service.ListAttr();

            return View();
        }

        [HttpPost]
        public JsonResult Detail()
        {

            return Json("");
        }
    }
}