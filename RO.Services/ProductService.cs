using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RO.DB;
using RO.Model.Product;
using PetaPoco;

namespace RO.Services
{
    public class ProductService
    {
        /// <summary>
        /// 获取产品列表或分页
        /// </summary>
        /// <param name="m"></param>
        /// <param name="page">当不为0时，获取分页</param>
        /// <param name="pagesize">当不为0时，获取分页</param>
        /// <param name="total"></param>
        /// <returns></returns>
        public List<mProduct> List(mCondition m, int page, int pagesize,ref int total)
        {
            var sql = new Sql("select * from product where delstatus=0");

            if (string.IsNullOrEmpty(m.SearchKey))
            {
                sql.Append(" and (name like @0 or code like @0)", "%" + m.SearchKey + "%");
            }

            if (page == 0 && pagesize == 0)
            {
                return DB.product.repo.Query<mProduct>(sql).ToList();
            }
            else
            {
                var obj = DB.product.repo.Page<mProduct>(page, pagesize, sql);
                total = (int)obj.TotalItems;
                return obj.Items;
            }
        }

        /// <summary>
        /// 获取产品属性
        /// </summary>
        /// <returns></returns>
        public List<mAttribute> ListAttr()
        {
            var sql = new Sql("select * from attributes where type=1 and delstatus=0");
            return DB.attribute.repo.Query<mAttribute>(sql).ToList();
        }
    }
}
