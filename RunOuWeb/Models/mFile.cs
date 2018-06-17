using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RunOuWeb.Models
{
    public class mFile
    {
        public int id { get; set; }

        /// <summary>
        /// 文件名称
        /// </summary>
        public string filename { get; set; }

        /// <summary>
        /// 文件类型
        /// </summary>
        public string filetype { get; set; }

        /// <summary>
        /// 文件大小
        /// </summary>
        public string filesize { get; set; }

        /// <summary>
        /// 文件保存路径
        /// </summary>
        public string filepath { get; set; }
    }
}