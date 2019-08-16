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

namespace AngularJS201.Controllers
{
    public class RoleController : Controller
    {
        // GET: Role
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void WriteRoleData(string roleName, string description, string permission)
        {
            WriteRoleDataXml(roleName, description, permission);
        }

        [HttpPost]
        public void UpdateRoleData(string currnetRoleName, string roleName, string description, string permission)
        {
            DeleteRoleDataXml(currnetRoleName);
            WriteRoleDataXml(roleName, description, permission);
        }

        [HttpGet]
        public string ReadRoleData()
        {
            return ReadRoleDataXml();
        }

        [HttpPost]
        public void DeleteRoleData(string roleName)
        {
            DeleteRoleDataXml(roleName);
        }

        private void WriteRoleDataXml(string roleName, string description, string permission)
        {
            string filepath = Server.MapPath("~/App_Data/role.xml");
            XmlDocument doc = new XmlDocument();
            doc.Load(Server.MapPath("~/App_Data/role.xml"));
            XmlNode root = doc.DocumentElement;
            var xmlnodeRole = doc.CreateElement("role");
            var xmlnodeRoleName = doc.CreateElement("RoleName");
            var xmlnodeDescription = doc.CreateElement("Description");
            var xmlnodePermission = doc.CreateElement("Permission");
            xmlnodePermission.InnerText = permission;
            var childNodeList = doc.ChildNodes;
            xmlnodeRoleName.InnerText = roleName;
            xmlnodeDescription.InnerText = description;
            XmlNodeList elemList = doc.GetElementsByTagName("role");
            foreach (XmlNode node in elemList)
            {
                if(node.ChildNodes[0].InnerText== roleName)
                    xmlnodePermission.InnerText = permission;
            }

            xmlnodeRole.AppendChild(xmlnodeRoleName);
            xmlnodeRole.AppendChild(xmlnodeDescription);
            xmlnodeRole.AppendChild(xmlnodePermission);
            root.AppendChild(xmlnodeRole);
            doc.Save(filepath);
        }

        private string ReadRoleDataXml()
        {
            string result = string.Empty;
            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(Server.MapPath("~/App_Data/role.xml"));
            }
            catch(Exception ex)
            {
                ;
            }

            XmlNodeList elemList = doc.GetElementsByTagName("role");
            var roles = new List<Roles>();
            for (int i = 0; i < elemList.Count; i++)
            {
                XmlNode xmlnodeRoleName = elemList[i].FirstChild;
                XmlNode xmlnodeDescription = elemList[i].ChildNodes[1];
                XmlNode xmlnodePermission = elemList[i].LastChild;
                roles.Add(
                 new Roles()
                 {
                     RoleName = xmlnodeRoleName.InnerText,
                     Description = xmlnodeDescription.InnerText,
                     Permission = xmlnodePermission.InnerText
                 });
            }

            if (roles != null)
                result = JsonConvert.SerializeObject(roles).ToString();
            return result;

        }

        private void DeleteRoleDataXml(string roleName)
        {
            string result = string.Empty;
            string filepath = Server.MapPath("~/App_Data/role.xml");
            XmlDocument doc = new XmlDocument();
            doc.Load(Server.MapPath("~/App_Data/role.xml"));
            XmlNodeList nodes = doc.GetElementsByTagName("role");
            for (int i = nodes.Count - 1; i >= 0; i--)
            {
                if (nodes[i].FirstChild.InnerText == roleName)
                    nodes[i].ParentNode.RemoveChild(nodes[i]);
            }

            doc.Save(filepath);

        }
    }
}