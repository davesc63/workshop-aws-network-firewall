+++
title = "Distributed Network Firewall"
weight = 3
+++



For the distributed deployment model, we deploy AWS Network Firewall into each VPC which requires protection. Each VPC is protected individually and blast radius is reduced through VPC isolation. Each VPC does not require connectivity to any other VPC or AWS Transit Gateway. Each AWS Network Firewall can have its own firewall policy or share a policy through common rule groups (reusable collections of rules) across multiple firewalls. This allows each AWS Network Firewall to be managed independently, which reduces the possibility of misconfiguration and limits the scope of impact.

Depending on the workload and traffic pattern, there are a number of AWS Network Firewall deployment models to consider. Below are those models.

![distributed-model](/images/dist.png)



<br>

        CDK code goes here
<br>

