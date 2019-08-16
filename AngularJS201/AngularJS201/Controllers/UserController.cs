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
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void WriteUserData(string userName, string emailId)
        {
            var result = WriteUserDataXml(userName, emailId);
        }

        [HttpPost]
        public void UpdateUserData(string currnetUserName, string userName, string emailId)
        {
            var result = DeleteUserDataXml(currnetUserName);
            result = WriteUserDataXml(userName, emailId);
        }

        [HttpGet]
        public string ReadUserData()
        {

            return ReadUserDataXml();
        }

        [HttpPost]
        public void deleteUserData(string userName)
        {
            DeleteUserDataXml(userName);
        }

        private void WriteUserDataText(string userName, string emailId)
        {
            string filepath = Server.MapPath("~/App_Data/user.txt");
            StreamWriter txtWriter = new StreamWriter(filepath, true);
            txtWriter.WriteLine($"{userName},{emailId}");
            txtWriter.Close();
        }

        private string ReadUserDataText()
        {
            string result = string.Empty;
            var users = new List<Users>();
            var txtReader = new StreamReader(Server.MapPath("~/App_Data/user.txt"));
            string txt = "";
            while ((txt = txtReader.ReadLine()) != null)
            {
                users.Add(
                    new Users()
                    {
                        UserName = txt.Split(',')[0],
                        EmaliId = txt.Split(',')[1],
                        Role = txt.Split(',')[2]
                    });
            }

            txtReader.Close();
            if (users != null)
                result = JsonConvert.SerializeObject(users).ToString();
            return result;

        }

        private bool WriteUserDataXml(string userName, string emailId)
        {
            try
            {
                string filepath = Server.MapPath("~/App_Data/user.xml");
                XmlDocument doc = new XmlDocument();
                doc.Load(Server.MapPath("~/App_Data/user.xml"));
                XmlNode root = doc.DocumentElement;
                var xmlnodeUser = doc.CreateElement("user");
                var xmlnodeUserName = doc.CreateElement("UserName");
                var xmlnodeEmailId = doc.CreateElement("EmailId");
                var xmlnodeRole = doc.CreateElement("Role");
                xmlnodeUserName.InnerText = userName;
                xmlnodeEmailId.InnerText = emailId;
                xmlnodeUser.AppendChild(xmlnodeUserName);
                xmlnodeUser.AppendChild(xmlnodeEmailId);
                xmlnodeUser.AppendChild(xmlnodeRole);
                root.AppendChild(xmlnodeUser);
                doc.Save(filepath);
                return true;
            }
            catch
            {
                return false;
            }
                  
        }

        private string ReadUserDataXml()
        {
            string result = string.Empty;
            XmlDocument doc = new XmlDocument();
            try {
                doc.Load(Server.MapPath("~/App_Data/user.xml"));
            }
            catch
            {
                ;
            }
           
            XmlNodeList elemList = doc.GetElementsByTagName("user");
            var users = new List<Users>();
            for (int i = 0; i < elemList.Count; i++)
            {
                XmlNode xmlnodeUserName = elemList[i].FirstChild;
                XmlNode xmlnodeEmailId = elemList[i].ChildNodes[1];
                XmlNode xmlnodeRole = elemList[i].LastChild;
                users.Add(
                 new Users()
                 {
                     UserName = xmlnodeUserName.InnerText,
                     EmaliId = xmlnodeEmailId.InnerText,
                     Role = xmlnodeRole.InnerText
                 });
            }

            if (users != null)
                result = JsonConvert.SerializeObject(users).ToString();           
            return result;

        }

        private bool DeleteUserDataXml(string userName)
        {
            try
            {
                string result = string.Empty;
                string filepath = Server.MapPath("~/App_Data/user.xml");
                XmlDocument doc = new XmlDocument();
                doc.Load(Server.MapPath("~/App_Data/user.xml"));
                XmlNodeList nodes = doc.GetElementsByTagName("user");
                for (int i = nodes.Count - 1; i >= 0; i--)
                {
                    if (nodes[i].FirstChild.InnerText == userName)
                        nodes[i].ParentNode.RemoveChild(nodes[i]);
                }

                doc.Save(filepath);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}