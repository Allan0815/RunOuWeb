using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RunOuWeb.Models;
using RO.Services;

namespace RunOuWeb.Controllers
{
    public class FileController : Controller
    {
        // GET: File
        public JsonResult Upload()
        {
            var m = new RO.Model.mFile();

            try
            {
                var file = HttpContext.Request.Files[0];
                m.filename = file.FileName;
                m.filesize = (file.ContentLength / 1024) + "kb";

                var filepath = "~/Files/" + string.Format("{0}/{1}/{2}/", DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                var filename = AiHS.Core.StringHelper.TimeTamp() + "." + file.FileName.Split('.')[1];

                if (!Directory.Exists(Server.MapPath(filepath)))
                {
                    Directory.CreateDirectory(Server.MapPath(filepath));
                }

                file.SaveAs(Server.MapPath(filepath + filename));

                m.filepath = filepath + filename;

                m.id = new FileServices().Add(m);

            }
            catch { }

            return Json(m);
        }

        
    }
}