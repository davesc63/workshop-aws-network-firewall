+++
title = "Centralised Network Firewall"
weight = 4
+++

AWS Network Firewall is deployed into centralized VPC for East-West (VPC-to-VPC) and/or North-South (internet egress and ingress, on-premises) traffic. We refer to this VPC as inspection VPC throughout this workshop.

For centralized deployment model, [**AWS Transit Gateway**](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html) is a prerequisite. AWS Transit Gateway acts as a network hub and simplifies the connectivity between VPCs as well as on-premises networks. AWS Transit Gateway also provides inter-region peering capabilities to other Transit Gateways to establish a global network using AWS backbone.

Another key characteristic of the centralized deployment is a dedicated inspection VPC. Inspection VPC consists of two subnets in each AZs. One subnet is a dedicated firewall endpoint subnet and second is dedicated to AWS Transit Gateway attachment. Figure 5 depicts an example in which an AWS Region with three AZs has six subnets in total for Inspection VPCs. This is a Multi-AZ configuration.

Each Transit Gateway subnet requires a dedicated VPC route table to ensure the traffic is forwarded to firewall endpoint within the same AZ. These route tables have a default route (0.0.0.0/0) pointing towards firewall endpoint in the same AZ.
![distributed-model](/images/central1.png)


For the return traffic from firewall endpoint, a single VPC route table is configured. The route table contains a default route towards AWS Transit Gateway. Traffic is returned to AWS Transit Gateway in the same AZ after it has been inspected by AWS Network Firewall. Figure below shows traffic flow of inspection VPC.

![distributed-model](/images/central2.png)

<br>

        CDK Code goes here
<br>

