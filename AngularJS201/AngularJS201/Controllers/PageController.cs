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
    public class PageController : Controller
    {
        // GET: Page
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void WritePageData(string pageName, string description)
        {
            WritePageDataXml(pageName, description);
        }

        [HttpPost]
        public void UpdatePageData(string currnetPageName, string pageName, string description)
        {
            DeletePageDataXml(currnetPageName);
            WritePageDataXml(pageName, description);
        }

        [HttpGet]
        public string ReadPageData()
        {
            return ReadPageDataXml();
        }

        [HttpPost]
        public void DeletePageData(string pageName)
        {
            DeletePageDataXml(pageName);
        }

        private void WritePageDataXml(string pageName, string description)
        {
            string filepath = Server.MapPath("~/App_Data/page.xml");
            XmlDocument doc = new XmlDocument();
            doc.Load(Server.MapPath("~/App_Data/page.xml"));
            XmlNode root = doc.DocumentElement;
            var xmlnodePage = doc.CreateElement("page");
            var xmlnodePageName = doc.CreateElement("pageName");
            var xmlnodeDescription = doc.CreateElement("Description");
            xmlnodePageName.InnerText = pageName;
            xmlnodeDescription.InnerText = description;
            xmlnodePage.AppendChild(xmlnodePageName);
            xmlnodePage.AppendChild(xmlnodeDescription);
            root.AppendChild(xmlnodePage);
            doc.Save(filepath);
        }

        private string ReadPageDataXml()
        {
            string result = string.Empty;
            XmlDocument doc = new XmlDocument();
            try
            {
                doc.Load(Server.MapPath("~/App_Data/page.xml"));
            }
            catch
            {
                ;
            }

            XmlNodeList elemList = doc.GetElementsByTagName("page");
            var pages = new List<Pages>();
            for (int i = 0; i < elemList.Count; i++)
            {
                XmlNode xmlnodePageName = elemList[i].FirstChild;
                XmlNode xmlnodeDescription = elemList[i].LastChild;
                pages.Add(
                 new Pages()
                 {
                     PageName = xmlnodePageName.InnerText,
                     Description = xmlnodeDescription.InnerText
                 });
            }

            if (pages != null)
                result = JsonConvert.SerializeObject(pages).ToString();
            return result;

        }

        private void DeletePageDataXml(string pageName)
        {
            string result = string.Empty;
            string filepath = Server.MapPath("~/App_Data/page.xml");
            XmlDocument doc = new XmlDocument();
            doc.Load(Server.MapPath("~/App_Data/page.xml"));
            XmlNodeList nodes = doc.GetElementsByTagName("page");
            for (int i = nodes.Count - 1; i >= 0; i--)
            {
                if (nodes[i].FirstChild.InnerText == pageName)
                    nodes[i].ParentNode.RemoveChild(nodes[i]);
            }

            doc.Save(filepath);

        }
    }
}