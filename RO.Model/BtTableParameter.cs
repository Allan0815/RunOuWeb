using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RO.Model
{
    public class BtTableParameter
    {
        /// <summary>
        /// 每页多少条
        /// </summary>
        public int limit { get; set; }

        /// <summary>
        /// 从多少条开始
        /// </summary>
        public int offset { get; set; }

        /// <summary>
        /// 排序方式
        /// </summary>
        public string order { get; set; }

        /// <summary>
        /// 排序的字段
        /// </summary>
        public string sort { get; set; }

        /// <summary>
        /// 搜索项
        /// </summary>
        public string search { get; set; }

        /// <summary>
        /// 当前第几页
        /// </summary>
        public int pageIndex
        {
            get
            {
                return (offset / (limit <= 0 ? 1 : limit)) + 1;
            }
        }
        /// <summary>
        /// 是否导出
        /// </summary>
        public bool is_export
        {
            get
            {
                return limit <= 0;
            }
        }
    }
}
