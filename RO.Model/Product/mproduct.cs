using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RO.Model.Product
{
    public class mProduct
    {
        public int id { get; set; }
        
        public string code { get; set; }
        
        public string name { get; set; }
        
        public string mainpic { get; set; }
        
        public decimal price { get; set; }
        
        public decimal saleprice { get; set; }
        
        public int state { get; set; }
        
        public int count { get; set; }
        
        public int delstatus { get; set; }
        
        public DateTime createtime { get; set; }
        
        public int createuserid { get; set; }
        
        public string createusername { get; set; }
        
        public DateTime? lastupdatetime { get; set; }
        
        public int? lastupdateuserid { get; set; }
        
        public string lastupdateusername { get; set; }
    }
}
