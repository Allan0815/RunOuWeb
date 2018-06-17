using RO.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RO.Services
{
    public class FileServices
    {
        public int Add(mFile m)
        {
            var obj = new DB.file() {
                filename = m.filename,
                filepath = m.filepath,
                filesize = m.filesize,
                filetype = m.filetype,
            };

            obj.Insert();

            return obj.id;
        }
    }
}
