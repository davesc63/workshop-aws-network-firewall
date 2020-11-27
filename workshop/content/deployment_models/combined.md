+++
title = "Combined Network Firewall"
weight = 4
+++

AWS Network Firewall is deployed into centralized inspection VPC for East-West (VPC-to-VPC) and subset of North-South (On Premises/Egress) traffic. Internet ingress is distributed to VPCs which require dedicated inbound access from the internet and AWS Network Firewall is deployed accordingly.

For combined centralized and distributed deployment model, we can deploy AWS Network Firewall in the central inspection VPC and also in each VPC which requires local internet ingress and/or egress. In this model, workloads can use local IGW and connect to internal networks (VPCs, on-premises) through the centralized inspection VPC. Private subnets in such VPC retain an option to use centralized internet egress VPC.

![distributed-model](/images/combined1.png)