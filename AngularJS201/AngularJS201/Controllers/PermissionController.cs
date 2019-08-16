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
    public class PermissionController : Controller
    {
        // GET: Page
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void WritePermissionData(List<Roles> roles)
        {
            WritePermissionDataXml(roles);             
        }
                
        [HttpGet]
        public string ReadPermissionData()
        {
            return ReadPermissionDataXml();
        }
        
        private void WritePermissionDataXml(List<Roles> roles)
        {
            string filepath = Server.MapPath("~/App_Data/role.xml");
            XDocument doc = XDocument.Load(Server.MapPath("~/App_Data/role.xml"));

            foreach (var role in roles)
            {
                XElement roleCollection = doc.Elements("roles").Elements("role")
                                              .Where(x => x.Element("RoleName").Value == role.RoleName)
                                              .FirstOrDefault();
                 
                roleCollection.Element("Permission").SetValue(role.Permission);
            } 
            doc.Save(filepath);         
           
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