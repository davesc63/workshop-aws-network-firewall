+++
title = "Concepts of a Network Firewall"
weight = 5
+++

**AWS Network Firewall** runs stateless and stateful traffic inspection rules engines. The engines use rules and other settings that you configure inside a firewall policy.

You use a firewall on a **per-Availability Zone** basis in your VPC. For each Availability Zone, you choose a subnet to host the firewall endpoint that filters your traffic. The firewall endpoint in an Availability Zone can protect all of the subnets inside the zone except for the one where it’s located.

You can manage AWS Network Firewall with the following central components:

- **Firewall** – A firewall connects the VPC that you want to protect to the protection behavior that’s defined in a firewall policy. For each Availability Zone where you want protection, you provide Network Firewall with a public subnet that’s dedicated to the firewall endpoint. To use the firewall, you update the VPC route tables to send incoming and outgoing traffic through the firewall endpoints.

- **Firewall policy** – A firewall policy defines the behavior of the firewall in a collection of stateless and stateful rule groups and other settings. You can associate each firewall with only one firewall policy, but you can use a firewall policy for more than one firewall.

- **Rule group** – A rule group is a collection of stateless or stateful rules that define how to inspect and handle network traffic. Rules configuration includes 5-tuple and domain name filtering. You can also provide stateful rules using a Suricata open source rule specification.

