+++
title = "AWS Network Firewall"
weight = 1
+++

Our customers want to have a high availability, scalable firewall service to protect their virtual networks in the cloud. Security is the number one priority of AWS, which has provided various firewall capabilities on AWS that address specific security needs. 

We heard customers want an easier way to scale network security across all the resources in their workload, regardless of which AWS services they used. They also want customized protections to secure their unique workloads, or to comply with government mandates or commercial regulations. These customers need the ability to do things like URL filtering on outbound flows, pattern matching on packet data beyond IP/Port/Protocol and the ability to alert on specific vulnerabilities for protocols beyond HTTP/S.

We are happy to announce AWS Network Firewall, a high availability, managed network firewall service for your virtual private cloud (VPC). It enables you to easily deploy and manage stateful inspection, intrusion prevention and detection, and web filtering to protect your virtual networks on AWS. Network Firewall automatically scales with your traffic, ensuring high availability with no additional customer investment in security infrastructure.

With AWS Network Firewall, you can implement customized rules to prevent your VPCs from accessing unauthorized domains, to block thousands of known-bad IP addresses, or identify malicious activity using signature-based detection. AWS Network Firewall makes firewall activity visible in real-time via CloudWatch metrics and offers increased visibility of network traffic by sending logs to S3, CloudWatch and Kinesis Firehose. Network Firewall is integrated with AWS Firewall Manager, giving customers who use AWS Organizations a single place to enable and monitor firewall activity across all your VPCs and AWS accounts.

![anfw](/images/awsfw2.png)