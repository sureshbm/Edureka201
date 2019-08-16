using AngularJS201.app.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;

namespace AngularJS201.Controllers
{
    public class UserRoleController : Controller
    {
        // GET: Page
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void WriteUserRoleData(List<UserRole> data)
        {
            WriteUserRoleDataXml(data);
        }

        [HttpGet]
        public string ReadPermissionData()
        {
            return ReadPermissionDataXml();
        }

        private void WriteUserRoleDataXml(List<UserRole> userRole)
        {
            string filepath = Server.MapPath("~/App_Data/user.xml");
            XDocument doc = XDocument.Load(Server.MapPath("~/App_Data/user.xml"));

            foreach (var item in userRole)
            {
                XElement userCollection = doc.Elements("users").Elements("user")
                                              .Where(x => x.Element("UserName").Value == item.UserName)
                                              .FirstOrDefault();

                userCollection.Element("Role").SetValue(item.SelectedRole);
            }
            doc.Save(filepath);


            //var roleCollection = doc.Elements("userrole");
            //foreach (var item in roleCollection)
            //{
            //    item.RemoveAll();
            //}
            //foreach (var item in data)
            //{
            //    var ur = new XElement("ur");
            //    var userName = new XElement("UserName");
            //    var role = new XElement("Role");
            //    userName.SetValue(item.UserName);
            //    role.SetValue(item.Role);
            //    ur.Add(userName);
            //    ur.Add(role);
            //    roleCollection.Append(ur);
            //}
            //doc.Save(filepath);

        }

        private string ReadPermissionDataXml()
        {
            string result = string.Empty;
            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(Server.MapPath("~/App_Data/role.xml"));
            }
            catch
            {
                ;
            }

            XmlNodeList elemList = doc.GetElementsByTagName("role");
            var permissions = new List<Roles>();
            for (int i = 0; i < elemList.Count; i++)
            {
                XmlNode xmlnodeRoleName = elemList[i].FirstChild;
                XmlNode xmlnodeDescription = elemList[i].ChildNodes[1];
                XmlNode xmlnodePermission = elemList[i].LastChild;
                permissions.Add(
                 new Roles()
                 {
                     RoleName = xmlnodeRoleName.InnerText,
                     Description = xmlnodeDescription.InnerText,
                     Permission = xmlnodePermission.InnerText
                 });
            }

            if (permissions != null)
                result = JsonConvert.SerializeObject(permissions).ToString();
            return result;

        }

    }
}