using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RunOuWeb.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 产品列表
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public ActionResult Products(int? type)
        {

            return View();
        }

        /// <summary>
        /// 产品详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult ProductDetail(int? id)
        {
            return View();
        }

        /// <summary>
        /// 服务
        /// </summary>
        /// <returns></returns>
        public ActionResult Service(int? type)
        {
            ViewBag.t = type ?? 1;
            return View();
        }

        /// <summary>
        /// 新品动向
        /// </summary>
        /// <returns></returns>
        public ActionResult News(int? type)
        {

            return View();
        }

        /// <summary>
        /// 设计合作
        /// </summary>
        /// <returns></returns>
        public ActionResult Designs()
        {
            var rootUrl = Url.Content("~/Contents/images/designdemo/");
            var list = new List<string>() { };
            while (list.Count < 9)
            {
                list.Add(rootUrl + (list.Count + 1) + ".jpg");
            }

            ViewBag.list = list;
            return View();
        }

        /// <summary>
        /// 合作案例
        /// </summary>
        /// <returns></returns>
        public ActionResult CoopCase()
        {
            return View();
        }

        /// <summary>
        /// 互动专区
        /// </summary>
        /// <returns></returns>
        public ActionResult ChatZone()
        {
            return View();
        }

        public ActionResult AboutUs()
        {
            return View();
        }

    }
}