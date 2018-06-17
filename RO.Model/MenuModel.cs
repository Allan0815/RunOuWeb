using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RO.Model
{
    public class MenuModel
    {
        public string Title { get; set; }

        public string Path { get; set; }

        public string Icon { get; set; }

        public string Target { get; set; }

        public List<MenuModel> Child { get; set; }
    }

    public class OAAuthorizeModel
    {
        public bool IsSuccessed { get; set; }
        public string Message { get; set; }
        public string Data { get; set; }
    }

    public class OAMenuModel
    {

        /// <summary>
        /// 菜单id
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 菜单编号
        /// </summary>
        public string title { get; set; }

        /// <summary>
        /// 菜单图标
        /// </summary>
        public string img { get; set; }

        /// <summary>
        /// 菜单名称
        /// </summary>
        public string text { get; set; }

        /// <summary>
        /// 菜单链接地址
        /// </summary>
        public string value { get; set; }

        /// <summary>
        /// 是否有子集
        /// </summary>
        public bool hasChildren { get; set; }

        /// <summary>
        /// 父级的菜单id
        /// </summary>
        public string parentnodes { get; set; }

        /// <summary>
        /// 下级菜单
        /// </summary>
        public List<OAMenuModel> ChildNodes { get; set; }

        /// <summary>
        /// 是否是展开 --- 无用
        /// </summary>
        public bool isexpand { get; set; }

        /// <summary>
        /// 是否选中 --- 无用
        /// </summary>
        public bool showcheck { get; set; }
    }
}